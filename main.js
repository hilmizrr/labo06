import http from 'http'
import { status } from './status.js';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
  } else if (req.method === 'GET') {
    if (req.url === '/red') {
      res.end(JSON.stringify({ red: status.red }));
    } else if (req.url === '/blue') {
      res.end(JSON.stringify({ blue: status.blue }));
    } else if (req.url === '/status') {
      res.end(JSON.stringify(status));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'page not found' }));
    }
  } else if (req.method === 'PUT') {
    if (req.url === '/red') {
      status.red++;
      res.end(JSON.stringify({ red: status.red }));
    } else if (req.url === '/blue') {
      status.blue++;
      res.end(JSON.stringify({ blue: status.blue }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'page not found' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'page not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});


/* Het OPTIONS-verzoek is een HTTP-methode die wordt gebruikt om te bepalen welke methoden en headers worden ondersteund door de server. Het wordt vaak gebruikt in combinatie met CORS (Cross-Origin Resource Sharing). CORS is een mechanisme dat beveiligingsmaatregelen toepast in moderne browsers om te voorkomen dat scripts op een webpagina resources van een andere domeinnaam kunnen ophalen.

Bij het uitvoeren van een cross-origin HTTP-verzoek (bijvoorbeeld een AJAX-verzoek vanaf een webpagina naar een andere domeinnaam), stuurt de browser eerst een OPTIONS-verzoek naar de server om te controleren of het verzoek is toegestaan. De server moet vervolgens reageren met de juiste CORS-headers om het verzoek vanuit het andere domein toe te staan. De headers die worden ingesteld in de OPTIONS-response bepalen welke methoden, headers en domeinen zijn toegestaan voor cross-origin verzoeken.

In de bovenstaande code wordt het OPTIONS-verzoek afgehandeld door een 200-response terug te sturen zonder inhoud. Dit is de standaardmanier om preflight-verzoeken te verwerken en de browser te laten weten welke methoden en headers zijn toegestaan voor cross-origin verzoeken. */