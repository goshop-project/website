
export const onRequestGet = async ({ request }) => {
  console.log(request)

  const url = new URL(request.url)
  const { hostname, pathname, searchParams } = url

  const pkgname = hostname + pathname
  const root = hostname + "/" + pathname.split('/')[1]
  const repo = "https://github.com/goshop-project/" + pathname.split('/')[1]
  const godoc = "https://pkg.go.dev/" + pkgname
  const vcs = "git"

  const goget = searchParams.get('go-get')

  if (goget != 1) {
    // redirect to pkg.go.dev
    return Response.redirect(godoc, 302)
  }

  const body =`<!DOCTYPE html>
<head>
  <meta name="go-import" content="${root} ${vcs} ${repo}" />
  <meta http-equiv="refresh" content="5; url=${godoc}" />
</head>
<body>
  <pre>git clone <a href="${repo}">${repo}</a></pre>
  <pre>go get <a href="${godoc}">${pkgname}</a></pre>
  <pre>import "<a href="${godoc}">${pkgname}</a></pre>
</body>
`

  console.log(body)
  return new Response(body, {
    headers: { "Content-Type": "text/html" },
  })
}

export const onRequestHead = onRequestGet
