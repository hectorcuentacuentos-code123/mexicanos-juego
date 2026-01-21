sw.js// Nombre del caché para esta versión del juego
const CACHE_NAME = 'mexicanos-v1';

// Archivos que queremos que funcionen sin internet
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Evento de Instalación: Guarda los archivos en la memoria del dispositivo
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caché abierto con éxito');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Evento de Activación: Limpia memorias viejas si actualizas el juego
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Evento Fetch: Sirve el juego desde la memoria local para que sea rápido
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
