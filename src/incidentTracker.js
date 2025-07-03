// Incident response tracker based on real enterprise workflows
// Tracks: detection time, resolution time, affected services, RCA
// Generates reports in markdown format for stakeholder communication

class IncidentTracker {
    /**
     * Creates an instance of the incident tracker.
     * Initializes the incidents array to store enterprise incident records.
     */
    constructor() {
        // Initialize with fields needed for enterprise incidents
        this.incidents = [];
    }
    
    /**
     * Creates a new incident and adds it to the incidents list.
     *
     * @param {string} title - The title or summary of the incident.
     * @param {string} severity - The severity level of the incident (e.g., 'low', 'medium', 'high').
     * @param {string[]} affectedServices - An array of services affected by the incident.
     * @returns {Object} The newly created incident object.
     */
    createIncident(title, severity, affectedServices) {
        const incident = {
            id: this.incidents.length + 1,
            title,
            severity,
            affectedServices,
            detectionTime: new Date(),
            resolutionTime: null,
            rca: null
        };
        this.incidents.push(incident);
        return incident;
    }
    
    /**
     * Resolves an incident by its ID, setting the resolution time and root cause analysis (RCA).
     *
     * @param {string|number} id - The unique identifier of the incident to resolve.
     * @param {string} rca - The root cause analysis for the incident.
     * @returns {Object|undefined} The updated incident object if found and unresolved, otherwise undefined.
     */
    resolveIncident(id, rca) {
        const incident = this.incidents.find(inc => inc.id === id);
        if (incident && !incident.resolutionTime) {
            incident.resolutionTime = new Date();
            incident.rca = rca;
        }
        return incident;
    }

    /**
     * Calculates the Mean Time To Recovery (MTTR) for resolved incidents.
     *
     * MTTR is computed as the average time (in hours) between detection and resolution
     * for all incidents that have a resolution time.
     *
     * @returns {number} The MTTR value in hours. Returns 0 if there are no resolved incidents.
     */
    calculateMTTR() {
        const resolved = this.incidents.filter(inc => inc.resolutionTime);
        if (resolved.length === 0) return 0;
        const totalResolutionTime = resolved.reduce((sum, inc) => {
            return sum + (inc.resolutionTime - inc.detectionTime);
        }, 0);
        // Return MTTR in hours
        return totalResolutionTime / resolved.length / (1000 * 60 * 60);
    }

    /**
     * Generates a Markdown-formatted incident report summarizing all tracked incidents.
     *
     * The report includes details for each incident such as ID, title, severity, affected services,
     * detection and resolution times, and root cause analysis (RCA). At the end, it appends the
     * Mean Time To Recovery (MTTR) in hours.
     *
     * @returns {string} The generated Markdown report as a string.
     */
    generateMarkdownReport() {
        let report = `# Incident Report\n\n`;
        this.incidents.forEach(inc => {
            report += `## Incident #${inc.id}: ${inc.title}\n`;
            report += `- **Severity:** ${inc.severity}\n`;
            report += `- **Affected Services:** ${inc.affectedServices.join(', ')}\n`;
            report += `- **Detection Time:** ${inc.detectionTime.toISOString()}\n`;
            report += `- **Resolution Time:** ${inc.resolutionTime ? inc.resolutionTime.toISOString() : 'Unresolved'}\n`;
            report += `- **RCA:** ${inc.rca || 'Pending'}\n\n`;
        });
        report += `**MTTR:** ${this.calculateMTTR().toFixed(2)} hours\n`;
        return report;
    }
}