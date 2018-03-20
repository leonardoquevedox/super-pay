let FrontendUtils = module.exports = {
    libHasLoaded: () => {
        let hasLoaded = typeof window.PagSeguroDirectPayment !== "undefined";
        if (!hasLoaded) throw Error("SuperPay: Whoops! Please, make sure to load the PagSeguro library (PagSeguroDirectPayment) before calling any methods ;)");
        return hasLoaded;
    },
    pad: (d) => {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
}