const CACHED_ICONS: Record<string, string> = {
  'app.emmahealth.twa': 'https://play-lh.googleusercontent.com/iBNzCeEsWHf-TJ2aDcNh5jVfMpjFjd_e8ikNxxNqIYyEk8i6yPB2gmoxFP7D2tsThiODxg_InEZD2zc9L5B8',
  '6749905082': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/de/51/87/de518772-35f0-6480-d9c7-e09665ac9cbc/AppIcon-1x_U007epad-0-1-85-220-0.png/512x512bb.jpg',
}

const CACHED_PLAY_SCREENSHOTS: Record<string, string[]> = {
  'app.emmahealth.twa': [
    'https://play-lh.googleusercontent.com/K0kI9UJGoN6dMLDzwlGJx9oC9EWySMWEjzin4SdonED8YHNmkYXCbss9mGRmdswkUovuqD81wLXhO2OuQ4iLmow',
    'https://play-lh.googleusercontent.com/cxlHZH3sdpLoXc54jM2Az4XJlfM7bZbp0jTUNq4IqKzSUjPzOaWNOEa13BLSBsfa0tzEe-qWS4H67KluQ-ZK2w',
    'https://play-lh.googleusercontent.com/qxh9eLwAN1edlT5IzwGJb2__2jbCuuGN1jdrB8RFxaXbsccTRNvFvcNAlMyUDlFupEyhMQW0LEk0ntPVU-iT',
    'https://play-lh.googleusercontent.com/VEU3DHD7QFdTSdFVwL5_XC855GjoUfjozCkIrRzS1zHVvPnmMj6LkvQtXJ9C_r8mTV_L5r5fqQQZLDaBC-YC',
  ],
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const url = searchParams.get('url')
  const id = searchParams.get('id')

  if (!url && !id) {
    return Response.json({ error: 'Missing url or id' }, { status: 400 })
  }

  try {
    if (type === 'playstore') {
      const packageName = url?.match(/id=([^&]+)/)?.[1] || id
      const screenshots = packageName ? CACHED_PLAY_SCREENSHOTS[packageName] : undefined
      const icon = packageName ? CACHED_ICONS[packageName] : ''
      return Response.json({ screenshots: screenshots || [], icon: icon || '', title: packageName || '', type: 'playstore' })
    }

    if (type === 'appstore') {
      const appId = id || url?.match(/id(\d+)/)?.[1]
      if (!appId) return Response.json({ error: 'Could not extract app ID' }, { status: 400 })

      const cachedIcon = CACHED_ICONS[appId]

      const res = await fetch(`https://itunes.apple.com/lookup?id=${appId}&country=in`, { signal: AbortSignal.timeout(5000) })
      const data = await res.json()
      const app = data.results?.[0]

      if (app && app.screenshotUrls?.length) {
        return Response.json({
          screenshots: [...app.screenshotUrls, ...(app.ipadScreenshotUrls || [])],
          icon: app.artworkUrl512 || app.artworkUrl100 || cachedIcon,
          title: app.trackName,
          type: 'appstore',
        })
      }

      const pageRes = await fetch(`https://apps.apple.com/in/app/id${appId}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
        signal: AbortSignal.timeout(5000),
      })
      const pageHtml = await pageRes.text()
      const screenshotMatches = [...pageHtml.matchAll(/srcset="([^"]+)"[^>]*class="we-screenshot-image/g)]
      const screenshots: string[] = []
      for (const m of screenshotMatches) {
        const urls = m[1].split(',').map(s => s.trim().split(' ')[0])
        if (urls[0]) screenshots.push(urls[0])
      }

      return Response.json({
        screenshots: screenshots.slice(0, 6),
        icon: cachedIcon || '',
        title: app?.trackName || appId,
        type: 'appstore',
      })
    }

    if (type === 'website') {
      try {
        const mlRes = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url!)}&screenshot=true&meta=false`, { signal: AbortSignal.timeout(5000) })
        const mlData = await mlRes.json()
        const screenshotUrl = mlData?.data?.screenshot?.url
        if (screenshotUrl) {
          return Response.json({ screenshot: screenshotUrl, icon: `https://www.google.com/s2/favicons?domain=${new URL(url!).hostname}&sz=128`, title: new URL(url!).hostname, type: 'website' })
        }
      } catch {}
      return Response.json({ screenshot: null, icon: `https://www.google.com/s2/favicons?domain=${new URL(url!).hostname}&sz=128`, title: new URL(url!).hostname, type: 'website' })
    }

    return Response.json({ error: 'Invalid type' }, { status: 400 })
  } catch {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
