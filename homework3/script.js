function el(type, attrs, children) {

    const ele = document.createElement(type);

    if (Object.keys(attrs)) {
        for (let i in attrs) {
            ele.setAttribute(i, `${attrs[i]}`);
        }
    }

    if (typeof children === 'string') {
        ele.innerHTML = children

    } else {
        if (children !== null) {
            try {
                children.map(child => child).forEach(nods => {
                    ele.appendChild(nods)

                });
            }
            catch {
                ele.appendChild(children)
            }
        }

    }
    return ele;

}
// Test case 3.
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

document.getElementById("root").appendChild(tree);
