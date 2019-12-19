import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";
import { editCard, deleteCard, editChecklistBool, deleteChecklist, addChecklistItem } from "../store/actions";
import { connect } from "react-redux";
import Button from "./Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LinearProgress from "@material-ui/core/LinearProgress";

class Checklist extends PureComponent {
    state = {
        isAddingItem: false,
        checklistItem: "",
        items: []
    };

    componentDidMount() {
        this.setState({
            items: this.props.list.content
        });
    }

    closeForm = e => {
        this.setState({ isAddingItem: false, checklistItem: "" })
    }

    saveCard = e => {
        e.preventDefault();
        this.handleAddChecklistItem(e, this.props.checklistID, this.state.checklistItem);
        this.props.editCard(this.props.id, this.props.listID, this.props.cardText);
        this.setState({ isAddingItem: false, checklistItem: "" });
    };

    openAddItem = e => {
        e.preventDefault();
        this.setState({ isAddingItem: true });
    };
    handleChangeListItem = e => {
        this.setState({ checklistItem: e.target.value });
    };
    handleAddChecklistItem = (e, id, text) => {
        e.preventDefault();
        this.props.addChecklistItem(this.props.id, id, text);
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

    renderAddItem = () => {
        return (
            <div>
                <Form
                    single={true}
                    onSubmit={e => this.handleAddChecklistItem(e, this.props.checklistID, this.state.checklistItem)}
                    width="100%"
                    text={this.state.checklistItem}
                    onChange={this.handleChangeListItem}
                    closeForm={this.closeForm}
                    saveCard={this.saveCard}
                >
                    <Button onClick={this.saveCard}>Save</Button>
                </Form>
            </div>
        );
    };
    render() {
        const { index } = this.props;
        const card = this.props.cards[this.props.id];
        const list = card.checklists[index];

        return (
            <div key={index}>
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
                        <AssignmentTurnedInIcon
                            style={{
                                marginRight: "10px"
                            }}
                            fontSize="large"
                        />
                        <Typography>{list.title}</Typography>
                    </div>
                    <Button autoFocus onClick={e => this.props.handleDeleteChecklist(e, list.id)} color="primary">
                        Delete
                    </Button>
                </div>
                <LinearProgress variant="determinate" value={this.checklistValue(list)} />
                {this.state.items.length > 0
                    ? this.state.items.map((con, ind) => (
                          <FormGroup column="true" key={ind}>
                              <FormControlLabel
                                  control={
                                      <Checkbox
                                          style={{
                                              paddingRight: "20px",
                                              paddingLeft: "15px"
                                          }}
                                          checked={con.checked}
                                          onChange={this.handleChangeChecklistBool(index, ind)}
                                          value={con.checked}
                                      />
                                  }
                                  label={con.text}
                              />
                          </FormGroup>
                      ))
                    : null}
                {this.state.isAddingItem ? (
                    this.renderAddItem()
                ) : (
                    <Button autoFocus onClick={this.openAddItem} color="primary">
                        Add item
                    </Button>
                )}
            </div>
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
})(Checklist);
