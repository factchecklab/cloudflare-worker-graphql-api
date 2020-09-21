// SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('')

  return hashHex
}

/**
 * Handle a request
 * @param {Event} event
 */
async function handleRequest(event) {
  let request = event.request
  let body = await request.clone().text()
  let hash = await sha256(body)
  let cacheUrl = new URL(request.url)
  // get/store the URL in cache by pre-pending the body's hash
  cacheUrl.pathname = cacheUrl.pathname + hash
  // Convert to a GET to be able to cache
  let cacheKey = new Request(cacheUrl, {
    headers: request.headers,
    method: 'GET',
  })
  let cache = caches.default
  // try to find the cache key in the cache
  let response = await cache.match(cacheKey)
  // otherwise, fetch response to POST request from origin
  if (!response) {
    let originUrl = new URL(request.url)
    // Use origin host gql.opencultures.life
    originUrl.hostname = ORIGIN
    response = await fetch(originUrl, request)
    response = new Response(response.body, response)
    response.headers.append(
      'X-FactcheckLab-Cache-Time',
      `${new Date().getTime()}`,
    )
    event.waitUntil(cache.put(cacheKey, response.clone()))
  }
  return response
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})
