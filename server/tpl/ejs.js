module.exports = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=ddvice-width, initial-scale=1">
        <title>Koa Server HTML</title>
        <link href="https://cdn.bootcss.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <h1>H1 <%= you %></h1>
              <p>This is <%= me %></p>
            </div>
            <div class="col-md-4">动态 EJS 页面</div>
          </div>
        </div>
      </body>
    </html>
`