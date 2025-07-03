// Function to check health of multiple API endpoints
// Should return status code, response time, and health status
// Include error handling and timeout support
async function checkAPIHealth(urls, timeout = 5000) {
    /**
     * Fetches a resource from the network with a timeout.
     *
     * Initiates a fetch request to the specified URL and rejects the promise if the request
     * does not complete within the given timeout duration.
     *
     * @param {string} url - The URL to fetch.
     * @param {number} timeout - The timeout in milliseconds before the request is aborted.
     * @returns {Promise<Response>} A promise that resolves with the fetch response or rejects with an error if timed out.
     */
    const fetchWithTimeout = (url, timeout) => {
        return Promise.race([
            fetch(url),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), timeout)
            ),
        ]);
    };

    /**
     * An array of result objects representing the health check status for each URL.
     * @typedef {Object} ApiHealthResult
     * @property {string} url - The URL that was checked.
     * @property {number|null} status - The HTTP status code returned by the request, or null if the request failed.
     * @property {number} responseTime - The time taken (in milliseconds) to receive a response or error.
     * @property {boolean} healthy - Indicates if the API is healthy (true if response.ok, false otherwise).
     * @property {string} [error] - The error message if the request failed.
     *
     * @type {ApiHealthResult[]}
     */
    const results = await Promise.all(
        urls.map(async (url) => {
            const start = Date.now();
            try {
                const response = await fetchWithTimeout(url, timeout);
                const responseTime = Date.now() - start;
                return {
                    url,
                    status: response.status,
                    responseTime,
                    healthy: response.ok,
                };
            } catch (error) {
                const responseTime = Date.now() - start;
                return {
                    url,
                    status: null,
                    responseTime,
                    healthy: false,
                    error: error.message,
                };
            }
        })
    );
    return results;
}