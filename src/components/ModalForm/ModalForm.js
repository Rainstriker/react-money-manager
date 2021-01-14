import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Anchor  } from 'antd';

const { Link } = Anchor;

class ModalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
    };
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  buttonStyleOnChange = (buttonStyle, buttonElement) => {
    if (buttonStyle === 'button') {
      return (<Button type="primary" onClick={this.showModal}>{buttonElement}</Button>
      );
    } else {
      return (
        <Anchor onClick={this.showModal}>
          <Link title={buttonElement}/>
        </Anchor>);
    }
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        {this.buttonStyleOnChange(this.props.buttonStyle, this.props.buttonElement)}
        <Modal
          visible={visible}
          title={this.props.title}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}>
          {this.props.form}
        </Modal>
      </>
    );
  }
}


export default ModalForm;