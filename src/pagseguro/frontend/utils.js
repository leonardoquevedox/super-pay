let FrontendUtils = module.exports = {
    libHasLoaded: () => {
        let hasLoaded = typeof window.PagSeguroDirectPayment !== "undefined";
        if (!hasLoaded) throw Error("SuperPay: Whoops! Please, it looks like the brwoser was unable to load the PagSeguro library (PagSeguroDirectPayment) before calling any methods ;)");
        return hasLoaded;
    }
}