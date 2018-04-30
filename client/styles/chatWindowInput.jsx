import styled from 'styled-components';

const Textarea = styled.div`
    .picker__style {
        position: absolute;
        bottom: 60px;
        right: 30px;
        background: #b7c5f5;
        padding: 5px;
        borderRadius: 5px;
        border: 1px solid #b7c5f5;
        cursor: pointer;
    }

    .inputField__style {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }

    .textarea__style {
        width: 97%;
        resize: none;
        height: 45px;
        border: none;
        outline: none;
        padding: 16px 0 0 16px;
        box-sizing: border-box;
        background-color: rgba(255,255,255,.7);
        display: inline-block;
    }

    .closeEmojiButton__style {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        margin-left: 170px;
    }

    .openEmojiButton__style {
        cursor: pointer;
        display: inline-block;
        font-size: 25px;
        vertical-align: top;
    }

    .emoji__style {
        padding: 5px;
        cursor: pointer;
    }

   .clip {
        cursor: pointer;
        display: inline-block;
        margin: 10px 0;
        width: 25px;
        height: 25px;
        background-image: url("/static/images/clip.ico");
        background-size: contain;
   }
`;

export default Textarea;
