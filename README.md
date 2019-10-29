# horizon-2019

Files to create a static copy of the horizonfestival.com.au site that was originally created in Drupal. The files in this repository were cloned from a local copy of the Drupal site using httrack.

The easiest way to install httrack on a Mac is with Homebrew:

brew install httrack

The basic httrack command to clone the site is:

httrack http://horizon-festival.lndo.site -O . -N "%h%p/%n/index%[page].%t" -WqQ%v --robots=0

The -N flag uses a pattern to rewrite the pages of the site, including pager pages, into the pattern "/section/pagename/index.html". Creating static pages using this pattern (where the page at "/about" is transformed into a file called "/about/index.html") means that incoming links to "/about" will still work. Without the -N flag, the page at "/about" would have been transformed into a file called "about.html".

The pattern also tells httrack to find a value in the query string called "page" and insert that value, if it exists, into the url pattern in the spot marked by [page]. Paged views will create links like "/section/pagename/index2.html", "/section/pagename/index3.html" for each page of the view. Without specifying this, the pager links would have been created as meaningless hash values of the query string. This way the pager links are user friendly and similar (but not quite the same) as the original link urls.

See [https://docs.google.com/document/d/1lRjkKcM57K1iEDOmMBt33mKvBcpnU8brYACYjONqAIs]
