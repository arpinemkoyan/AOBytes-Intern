class DomElement {
    constructor(type, attrs, children) {
        this.type = type;
        this.attrs = attrs;
        this.children = children
    }
    render = () => {
        if (this.type === 'div') {
            return new DivElement(this.type, this.attrs).render();
        }
        else if (this.type === 'span')
            return new SpanElement(this.type, this.attrs).render();
        else if (this.type === 'ul')
            return new UlElement(this.type, this.attrs).render();
        else if (this.type === 'li')
            return new LiElement(this.type, this.attrs).render();
        else if (this.type === 'br')
            return new BrElement(this.type, this.attrs).render();
        else if (this.type === 'input')
            return new InputElement(this.type, this.attrs).render();
        else if (this.type === 'label')
            return new LabelElement(this.type, this.attrs).render();
        else if (this.type === 'form')
            return new FormElement(this.type, this.attrs).render();

    }
    draw = () => {
        const ele = document.createElement(this.type);
        if (Object.keys(this.attrs)) {
            for (let i in this.attrs) {
                ele.setAttribute(i, `${this.attrs[i]}`);
            }
        }
        return ele

    }
}

class DivElement extends DomElement {
    constructor(type, attrs, children) {
        // super(props);
        super(type, attrs, children)
        this.attrs = attrs
    }
    render = () => {
        if (Object.keys(this.attrs).includes('href') || Object.keys(this.attrs).includes('src') || Object.keys(this.attrs).includes('alt')) {
            throw new Warning("The wrong attributs for div");
        }
        return this.draw()
    }
}

class SpanElement extends DomElement {
    constructor(type, attrs, children) {
        super(type, attrs, children)
        this.attrs = attrs
    }
    render = () => {
        if (Object.keys(this.attrs).includes('href') || Object.keys(this.attrs).includes('src') || Object.keys(this.attrs).includes('alt')) {
            throw new Warning("The wrong attributs for span");
        }
        return this.draw()
    }
}

class UlElement extends DomElement {
    constructor(type, attrs, children) {
        super(type, attrs, children)
        this.attrs = attrs
    }
    render = () => {
        if (Object.keys(this.attrs).includes('href') || Object.keys(this.attrs).includes('src') || Object.keys(this.attrs).includes('alt')) {
            throw new Warning("The wrong attributs for ul");
        }
        return this.draw()
    }
}

class LiElement extends DomElement {
    constructor(type, attrs, children) {
        super(type, attrs, children)
        this.attrs = attrs
    }
    render = () => {
        if (Object.keys(this.attrs).includes('href') || Object.keys(this.attrs).includes('src') || Object.keys(this.attrs).includes('alt')) {
            throw new Warning("The wrong attributs for li");
        }
        return this.draw()
    }
}

class FormElement extends DomElement {
    constructor(type, attrs, children) {
        super(type, attrs, children)
        this.attrs = attrs
    }
    render = () => {
        if (Object.keys(this.attrs).includes('href') || Object.keys(this.attrs).includes('src') || Object.keys(this.attrs).includes('alt')) {
            throw new Warning("The wrong attributs for form");
        }
        return this.draw()
    }
}

class LabelElement extends DomElement {
    constructor(type, attrs, children) {
        super(type, attrs, children)
        this.attrs = attrs
    }
    render = () => {
        if (Object.keys(this.attrs).includes('href') || Object.keys(this.attrs).includes('src') || Object.keys(this.attrs).includes('alt')) {
            throw new Warning("The wrong attributs for label");
        }
        return this.draw()
    }
}

class InputElement extends DomElement {
    constructor(type, attrs, children) {
        super(type, attrs, children)
        this.attrs = attrs
    }
    render = () => {
        if (Object.keys(this.attrs).includes('href') || Object.keys(this.attrs).includes('src') || Object.keys(this.attrs).includes('alt')) {
            throw new Warning("The wrong attributs for input");
        }
        return this.draw()
    }
}

class BrElement extends DomElement {
    constructor(type, attrs, children) {
        super(type, attrs, children)
        this.attrs = attrs
    }
    render = () => {
        if (Object.keys(this.attrs) > 0) {
            throw new Warning("The wrong attributs for br");
        }
        return this.draw()
    }
}

function el(type, attrs, children) {
    let public = {
        draw: function () {
            const dom = new DomElement(type, attrs, children).render()

            if (typeof children === 'string') {
                dom.textContent = children

            } else {
                if (children !== null) {
                    try {
                        children.map(child => child.draw()).forEach(nods => {
                            dom.appendChild(nods)
                        });
                    }
                    catch {
                        dom.appendChild(children.draw())
                    }
                }
            }
            return dom

        }
    }

    return public

}

const tree =
    el("form", { action: '/some_action' }, [
        el("label", { for: 'name' }, "First name:"),
        el("br", {}, null),
        el("input", { type: 'text', id: 'name', name: 'name', value: "My name" }, null),
        el("br", {}, null),
        el("label", { for: 'last_name' }, "Last name:"),
        el("br", {}, null),
        el("input", { type: 'text', id: 'last_name', name: 'last_name', value: "My second name" }, null),
        el("br", {}, null),
        el("input", { type: 'submit', value: "Submit" }, null),
    ]);
document.getElementById("root").appendChild(tree.draw());