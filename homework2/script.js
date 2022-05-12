class myPromise {

    constructor(exFun) {
        this.handleError = () => { };
        this.handleSuccess = () => { };
        this.resolveFn = this.resolveFn.bind(this);
        this.rejectFn = this.rejectFn.bind(this);

        exFun(this.resolveFn, this.rejectFn);
    }

    then(handleSuccess) {
        this.handleSuccess = handleSuccess;
        return this;
    }

    catch(handleError) {
        this.handleError = handleError;
        return this;
    }

    resolveFn(value) {
        try {
            this.handleSuccess(value);
        } catch (error) {
            this.rejectFn(error);
        }
    }

    rejectFn(error) {
        this.handleError(error);
    }
}


const myAjaxMethod = (url, config) => {

    return new myPromise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(config.method, url, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
            else {
                reject(Error(xhr.statusText));
            }
        };

        xhr.onerror = function () {
            reject(Error("Network Error"));
        };
        xhr.send()
    });

};

myAjaxMethod("https://corona-api.com/countries", {
    method: 'GET',
    headers: {}
})
    .then((user) => {
        console.log(user);
    }).catch((error) => {
        console.log(error);
    });
