// Log parser for common enterprise patterns
// Based on TAM experience with CDN and streaming services
// Detects: error patterns, traffic spikes, cache hit issues
// Similar to patterns seen during Super Bowl traffic events

class LogParser {
    /**
     * Parses the provided log content and extracts lines that indicate origin errors with a 503 status code.
     *
     * @param {string} logContent - The raw log content as a string, with each line representing a log entry.
     * @returns {string[]} An array of log lines that contain a 503 status code.
     */
    parseOriginErrors(logContent) {
        // Extract lines with 503 status codes
        const lines = logContent.split('\n');
        const originErrors = lines.filter(line => line.includes(' 503 ') || line.match(/\b503\b/));
        return originErrors;
    }
    
    /**
     * Analyzes cache performance by calculating the hit rate, hit count, and miss count from log entries.
     *
     * @param {string[]} logs - An array of log lines, each containing cache status indicators such as "HIT" or "MISS".
     * @returns {{ hitRate: number, hitCount: number, missCount: number }} An object containing the cache hit rate, number of hits, and number of misses.
     */
    analyzeCachePerformance(logs) {
        // Assume logs is an array of log lines with cache status (e.g., "HIT", "MISS")
        let hitCount = 0;
        let missCount = 0;
        logs.forEach(line => {
            if (line.includes('HIT')) hitCount++;
            else if (line.includes('MISS')) missCount++;
        });
        const total = hitCount + missCount;
        const hitRate = total > 0 ? hitCount / total : 0;
        return { hitRate, hitCount, missCount };
    }
}