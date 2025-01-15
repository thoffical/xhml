class XHMLParser {
    constructor() {
        this.parser = new DOMParser();
    }

    parse(xhmlString) {
        const xmlDoc = this.parser.parseFromString(xhmlString, "application/xml");
        if (xmlDoc.getElementsByTagName("parsererror").length) {
            console.error("Error parsing XHML document.");
            return;
        }
        this.traverseNodes(xmlDoc.documentElement);
    }

    traverseNodes(node) {
        console.log(`Node: <${node.nodeName}>`);
        if (node.nodeName === "lang:merge") {
            const lang = node.getAttribute("languagename");
            console.log(`Merging language: ${lang}`);
        }

        node.childNodes.forEach(childNode => {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                this.traverseNodes(childNode);
            } else if (childNode.nodeType === Node.TEXT_NODE) {
                console.log(`Text: ${childNode.nodeValue.trim()}`);
            }
        });
    }
}

// Load and parse the default index.xhml file
fetch('index.xhml')
    .then(response => response.text())
    .then(xhmlString => {
        const parser = new XHMLParser();
        parser.parse(xhmlString);
    })
    .catch(error => console.error('Error loading the XHML file:', error));
