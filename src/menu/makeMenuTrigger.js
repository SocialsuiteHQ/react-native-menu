const createClass = require('create-react-class');
const PropTypes = require('prop-types');

module.exports = (React, ReactNative, { model }) => {
  const { TouchableWithoutFeedback, View } = ReactNative;

  const MenuTrigger = createClass({
    displayName: 'MenuTrigger',
    propTypes: {
      disabled: PropTypes.bool,
      renderTouchable: PropTypes.func
    },
    getDefaultProps() {
      return {disabled: false}
    },
    contextTypes: {
      menuController: model.IMenuController,
      getClosestMenuName: PropTypes.func.isRequired
    },
    onPress() {
      if (!this.props.disabled) {
        const { menuController, getClosestMenuName } = this.context;
        menuController.toggle(getClosestMenuName());
      }
    },
    render() {
      if(this.props.renderTouchable) {
        return React.cloneElement(this.props.renderTouchable(), {onPress: this.onPress}, (
          <View style={this.props.style}>
            { this.props.children }
          </View>
        ));
      }
      return (
        <TouchableWithoutFeedback onPress={this.onPress} {...this.props}>
          <View style={this.props.style}>
            { this.props.children }
          </View>
        </TouchableWithoutFeedback>
      );
    }
  });

  return MenuTrigger;
};
