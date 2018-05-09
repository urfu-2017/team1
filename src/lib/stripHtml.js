export default string => {
    if (!document) {
        return string;
    }
    const wrapper = document.createElement('div');
    wrapper.innerHTML = string;
    return wrapper.innerText;
}
