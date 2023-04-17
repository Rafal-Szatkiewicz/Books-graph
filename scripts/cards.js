const authorCardTemplate = document.querySelector("[data-author-template]");
        const authorCardContainer = document.querySelector("[data-author-cards-container]");
        const searchInput = document.querySelector("[data-search]");

        let authors = [];

        searchInput.addEventListener("input", e => {
            const value = e.target.value.toLowerCase().trim();

            authors.forEach(author => {
                const isVisible = author.name.toLowerCase().includes(value);
                author.element.classList.toggle("hide", !isVisible);
            });
        });

        fetch("./data/100k.json")
        .then(res => res.json())
        .then(res => {
        authors = res.data.map(author => {
            const card = authorCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            header.textContent = author.name;
            authorCardContainer.append(card);
            return { name: author.name, element: card };
        });
        });

        function getChart(e)
        {
            localStorage.setItem("author", e.children[0].textContent);
            location.replace("./chart.html")
        }