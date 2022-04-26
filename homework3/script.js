/*
* type: string  'div', 'span', etc
* attrs: object  class, id, etc
* children: DomElement | DomElement[]
*/

class DomElement {

    constructor(type, attrs, children) {
        this.type = type;
        this.attrs = attrs;
        this.children = children;
    }

    rander() {
        if (this.type.includes('div')) {
            const divEle = new DivElement(this.attrs, this.children);
            return divEle.draw();

        }
        if (this.type.includes('span')) {
            const spanEle = new SpanElement(this.attrs, this.children);
            return spanEle.draw();
        }

    }

}

class DivElement extends DomElement {
    constructor(attrs, children) {
        super();
        this.attrs = attrs;
        this.children = children
    }
    draw() {
        const div = document.createElement("div");
        if (Object.keys(this.attrs).length > 0) {
            for (let i in this.attrs) {
                if (i === 'class') {
                    div.className = `${this.attrs[i]}`;
                }
                else {
                    div.setAttribute(i, `${this.attrs[i]}`);
                }
            }
        }
        if (typeof this.children === 'string')
            div.textContent = this.children

        return div;
    }
}

class SpanElement extends DomElement {
    constructor(attrs, children) {
        super();
        this.attrs = attrs;
        this.children = children
    }
    draw() {
        const span = document.createElement("span");

        if (Object.keys(this.attrs).length > 0) {
            for (let i in this.attrs) {
                if (i === 'class') {
                    span.className = `${this.attrs[i]}`;
                }
                else {
                    span.setAttribute(i, `${this.attrs[i]}`);
                }
            }
        }

        if (typeof children === 'string')
            span.textContent = this.children

        return span;
    }
}

function el(type, attrs, children) {
    const dom = new DomElement(type, attrs, children)

    return {
        draw() {
            return dom.rander()

        }
    };

}

const tree = el("div", { "class": "some_classname", "id": "some_id" }, "Hello World");

document.getElementById("root").appendChild(tree.draw());
