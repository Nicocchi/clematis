import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import { TextareaAutosize, TextField } from "@material-ui/core";

const Container = styled.div`
    // width: 284px;
    margin-bottom: 8px;
`;

const StyledCard = styled(Card)`
    min-height: 25px;
    padding: 6px 8px 2px;
`;

const StyledTextArea = styled(TextareaAutosize)`
    resize: none;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: none;
`;

const ButtonContainer = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
    margin-left: 8px;
`;

const StyledIcon = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;
`;

const Form = React.memo(({ single, list, text = "", onChange, closeForm, children, width = "284px", saveCard }) => {
    const placeholder = list ? "Enter list title..." : "Enter a title for this card...";

    function keyPress(e) {
        if (e.key === 'Enter') {
            console.log("ENTER")
            saveCard(e);
        }
    }

    return (
        <Container style={{ width: width }}>
            <StyledCard>
                <StyledTextArea onKeyPress={e => keyPress(e)} placeholder={placeholder} autoFocus value={text} onChange={e => onChange(e)} onBlur={closeForm} />
            </StyledCard>
            <ButtonContainer>
                {children}
                <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
            </ButtonContainer>
        </Container>
    );
});

export default Form;
