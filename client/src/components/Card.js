import React, { useState, PureComponent } from "react";
import MCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";
import { editCard, deleteCard, editChecklistBool } from "../store/actions";
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
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
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
    state = {
        isEditng: false,
        cardText: "",
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    closeForm = e => {
        this.setState({ isEditing: false });
    };

    handleChange = e => {
        this.setState({ cardText: e.target.value });
    };

    saveCard = e => {
        e.preventDefault();
        dispatch(editCard(id, listID, cardText));
        this.setState({ isEditing: false });
    };

    handleDeleteCard = e => {
        dispatch(deleteCard(id, listID));
    };

    renderEditForm = () => {
        return (
            <Form
                text={this.state.cardText}
                onChange={this.handleChange}
                closeForm={this.closeForm}
            >
                <Button onClick={this.saveCard}>Save</Button>
            </Form>
        );
    };

    handleChangeChecklistBool = (index, index2) => e => {
        e.preventDefault();
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
        console.log("Cards", this.props);
        const card = this.props.cards[this.props.id];

        return this.state.isEditing ? (
            renderEditForm()
        ) : (
            <Draggable
                draggableId={String(this.props.id)}
                index={this.props.index}
            >
                {provided => (
                    <CardContainer
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <MCard onDoubleClick={() => this.closeForm()}>
                            <EditButton
                                onMouseDown={this.handleClickOpen}
                                fontSize="small"
                            >
                                edit
                            </EditButton>
                            <DeleteButton
                                fontSize="small"
                                onMouseDown={this.handleDeleteCard}
                            >
                                delete
                            </DeleteButton>

                            <CardContent>
                                <Typography>{this.props.text}</Typography>
                            </CardContent>
                        </MCard>
                        <Dialog
                            onClose={this.handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={this.state.open}
                            maxWidth="sm"
                            fullWidth={true}
                        >
                            <DialogTitle
                                id="customized-dialog-title"
                                onClose={this.handleClose}
                            >
                                {this.props.text}
                                <Typography>
                                    In list {this.props.listTitle}
                                </Typography>
                            </DialogTitle>

                            <DialogContent dividers>
                                <div
                                    style={{
                                        padding: "20px 20px 20px 0",
                                        fontWeight: "bold",
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <AssignmentIcon
                                            style={{ marginRight: "10px" }}
                                            fontSize="large"
                                        />
                                        <Typography>Description</Typography>
                                    </div>
                                    <Button
                                        autoFocus
                                        onClick={this.handleClose}
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                </div>
                                <Typography
                                    gutterBottom
                                    style={{ paddingLeft: "47px" }}
                                >
                                    {this.props.description}
                                </Typography>
                                <div style={{}}>
                                    {card.checklists.length > 0
                                        ? card.checklists.map((list, index) => (
                                              <div key={index}>
                                                  <div
                                                      style={{
                                                          padding:
                                                              "20px 20px 20px 0",
                                                          fontWeight: "bold",
                                                          display: "flex",
                                                          justifyContent:
                                                              "space-between"
                                                      }}
                                                  >
                                                      <div
                                                          style={{
                                                              display: "flex",
                                                              alignItems:
                                                                  "center"
                                                          }}
                                                      >
                                                          <AssignmentTurnedInIcon
                                                              style={{
                                                                  marginRight:
                                                                      "10px"
                                                              }}
                                                              fontSize="large"
                                                          />
                                                          <Typography>
                                                              {list.title}
                                                          </Typography>
                                                      </div>
                                                      <Button
                                                          autoFocus
                                                          onClick={
                                                              this.handleClose
                                                          }
                                                          color="primary"
                                                      >
                                                          Delete
                                                      </Button>
                                                  </div>
                                                  <LinearProgress
                                                      variant="determinate"
                                                      value={this.checklistValue(
                                                          list
                                                      )}
                                                  />
                                                  {list.content.length > 0
                                                      ? list.content.map(
                                                            (con, ind) => (
                                                                <FormGroup
                                                                    column="true"
                                                                    key={ind}
                                                                >
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                style={{
                                                                                    paddingRight:
                                                                                        "20px",
                                                                                    paddingLeft:
                                                                                        "15px"
                                                                                }}
                                                                                checked={
                                                                                    con.checked
                                                                                }
                                                                                onChange={this.handleChangeChecklistBool(
                                                                                    index,
                                                                                    ind
                                                                                )}
                                                                                value={
                                                                                    con.checked
                                                                                }
                                                                            />
                                                                        }
                                                                        label={
                                                                            con.text
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            )
                                                        )
                                                      : null}
                                              </div>
                                          ))
                                        : null}
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    autoFocus
                                    onClick={this.handleClose}
                                    color="primary"
                                >
                                    Save changes
                                </Button>
                            </DialogActions>
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
    editChecklistBool
})(Card);
