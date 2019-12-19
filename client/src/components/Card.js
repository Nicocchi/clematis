import React, { useState, PureComponent } from "react";
import MCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";
import { editCard, deleteCard, editChecklistBool, deleteChecklist, addChecklistItem } from "../store/actions";
import { connect } from "react-redux";
import Button from "./Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LinearProgress from "@material-ui/core/LinearProgress";
import store from "../store/index";
import { TextareaAutosize } from "@material-ui/core";
import Checklist from "./Checklist";

const CardContainer = styled.div`
    margin: 0 0 8px 0;
    position: relative;
    max-width: 100%;
    word-wrap: break-word;
`;

const EditButton = styled(Icon)`
    position: absolute;
    display: none;
    right: 5px;
    top: 5px;
    opacity: 0.5;
    ${CardContainer}:hover & {
        display: block;
        cursor: pointer;
    }
    &:hover {
        opacity: 0.8;
    }
`;

const DeleteButton = styled(Icon)`
    position: absolute;
    display: none;
    right: 5px;
    bottom: 5px;
    opacity: 0.5;
    ${CardContainer}:hover & {
        display: block;
        cursor: pointer;
    }
    &:hover {
        opacity: 0.8;
    }
`;

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

class Card extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEditng: false,
            isEditingDesc: false,
            cardText: "",
            cardDesc: "",
            open: false
        };

        this.saveCard = this.saveCard.bind(this);
    }

    componentDidMount() {
        const card = this.props.cards[this.props.id];
        this.setState({
            cardText: this.props.text,
            cardDesc: card.description
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    closeForm = e => {
        this.setState({ isEditing: false, isEditingDesc: false, isAddingItem: false, checklistItem: "" });
    };

    openForm = e => {
        this.setState({ isEditing: true });
    };

    openFormDesc = e => {
        e.preventDefault();
        this.setState({ isEditingDesc: true });
    };

    handleChange = e => {
        this.setState({ cardText: e.target.value });
    };

    handleChangeDesc = e => {
        this.setState({ cardDesc: e.target.value });
    };

    saveCard = e => {
        e.preventDefault();
        this.props.editCard(this.props.id, this.props.listID, this.state.cardText);
        this.setState({ isEditing: false, isEditingDesc: false, isAddingItem: false });
    };

    handleDeleteCard = e => {
        this.props.deleteCard(this.props.id, this.props.listID);
    };

    handleDeleteChecklist = (e, id) => {
        this.props.deleteChecklist(this.props.id, id);
    };

    renderEditForm = () => {
        return (
            <Form single={true} text={this.state.cardText} onChange={this.handleChange} closeForm={this.closeForm} saveCard={e => this.saveCard(e)}>
                <Button onClick={this.saveCard}>Save</Button>
            </Form>
        );
    };

    renderEditDesc = card => {
        return (
            <Form width="100%" text={this.state.cardDesc} onChange={this.handleChangeDesc} closeForm={this.closeForm}>
                <Button onClick={this.saveCard}>Save</Button>
            </Form>
        );
    };

    handleChangeChecklistBool = (index, index2) => e => {
        this.props.editChecklistBool(this.props.id, index, index2);
    };

    checklistValue = checklist => {
        const length = checklist.content.length;
        let value = 0;

        if (length > 0) {
            checklist.content.forEach(element => {
                if (element.checked) value += 1;
            });

            return (value * 100) / length;
        }
        return 0;
    };

    render() {
        const card = this.props.cards[this.props.id];

        return this.state.isEditing ? (
            this.renderEditForm()
        ) : (
            <Draggable draggableId={String(this.props.id)} index={this.props.index}>
                {provided => (
                    <CardContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <MCard onDoubleClick={() => this.openForm()} onClick={this.handleClickOpen}>
                            <EditButton onMouseDown={() => this.openForm()} fontSize="small">
                                edit
                            </EditButton>
                            <DeleteButton fontSize="small" onMouseDown={this.handleDeleteCard}>
                                delete
                            </DeleteButton>

                            <CardContent>
                                <Typography>{this.props.text}</Typography>
                            </CardContent>
                        </MCard>
                        <Dialog scroll="body" onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open} maxWidth="sm" fullWidth={true}>
                            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                                {this.props.text}
                                <Typography>In list {this.props.listTitle}</Typography>
                            </DialogTitle>

                            <DialogContent dividers>
                                <div
                                    style={{
                                        padding: "20px 20px 20px 0",
                                        fontWeight: "bold",
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                        <AssignmentIcon style={{ marginRight: "10px" }} fontSize="large" />
                                        <Typography>Description</Typography>
                                    </div>
                                    <Button autoFocus onClick={this.openFormDesc} color="primary">
                                        Edit
                                    </Button>
                                </div>
                                <div onClick={this.openFormDesc} style={{ paddingLeft: "47px", cursor: "pointer" }}>
                                    {this.state.isEditingDesc ? this.renderEditDesc(card) : this.state.cardDesc}
                                </div>
                                <div style={{}}>
                                    {card.checklists.length > 0
                                        ? card.checklists.map((list, index) => (
                                              <Checklist closeForm={this.closeForm} handleDeleteChecklist={this.handleDeleteChecklist} key={list.id} index={index} list={list} id={this.props.id} listID={this.props.listID} cardText={this.state.cardText} checklistID={list.id} />
                                          ))
                                        : null}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardContainer>
                )}
            </Draggable>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards
    };
}

export default connect(mapStateToProps, {
    editChecklistBool,
    editCard,
    deleteCard,
    deleteChecklist,
    addChecklistItem
})(Card);
