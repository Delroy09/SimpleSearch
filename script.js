function findText() {
    // Remove previous highlights and no results message
    const highlightedElements = document.querySelectorAll(".highlight");
    highlightedElements.forEach((element) => {
        const text = document.createTextNode(element.textContent);
        element.parentNode.replaceChild(text, element);
    });

    // Remove existing no results message if it exists
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) {
        existingMessage.remove();
    }

    const searchInput = document.getElementById("searchInput").value;
    const tableRows = document.querySelectorAll('tbody tr');
    
    // Show all rows if search is empty
    if (!searchInput) {
        tableRows.forEach(row => row.style.display = '');
        return;
    }

    // Get all table cells
    const regex = new RegExp(`(${searchInput})`, "gi");
    let firstMatch = null;
    let matchFound = false;
    
    // Search within each row
    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let hasMatch = false;
        
        cells.forEach(cell => {
            const text = cell.textContent;
            if (text.match(regex)) {
                cell.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
                hasMatch = true;
                matchFound = true;
                if (!firstMatch) {
                    firstMatch = cell;
                }
            }
        });

        // Show/hide row based on match
        row.style.display = hasMatch ? '' : 'none';
    });

    // Show no results message if no matches found
    if (!matchFound) {
        const tbody = document.querySelector('tbody');
        const noResults = document.createElement('tr');
        noResults.className = 'no-results';
        noResults.innerHTML = `<td colspan="3" style="text-align: center; padding: 20px;">No records found</td>`;
        tbody.appendChild(noResults);
    }

    // Scroll to first match if found
    if (firstMatch) {
        firstMatch.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}