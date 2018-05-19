export default () => {
    const urlWithoutHash = window.location.href.slice(0, window.location.href.indexOf('#'));
    history.replaceState(null, null, urlWithoutHash);
}
