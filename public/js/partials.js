fetch ('/public/html/partials/head.html')
.then (response=>response.text())
.then (data=>document.getElementById('head_contenido').innerHTML=data);

fetch ('/public/html/partials/nav.html')
.then (response=>response.text())
.then (data=>document.getElementById('nav_contenido').innerHTML=data);

fetch ('/public/html/partials/footer.html')
.then (response=>response.text())
.then (data=>document.getElementById('footer_contenido').innerHTML=data);