import React from 'react';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: props.open
        };
    }
    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
          this.props.onClose();
        }
    }

    componentDidMount() {
        if (this.props.onClose) {
          window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
        }
    }
      
    componentWillUnmount() {
        if (this.props.onClose) {
          window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
        }
    }
      
    onOverlayClick() {
        this.props.onClose();
    }
      
    onDialogClick(event) {
        event.stopPropagation();
    }
    render() {
        const {open} = this.props;
        const modalStyle = open ? 
        {
            overflow: 'hidden', 
            visibility: 'visible', 
            opacity: 1, 
            transition: 'opacity .25s linear',
            WebkitTransition: 'opacity .25s linear'
            
        } : {
            visibility: 'hidden', 
            opacity: 0 
        };

        
        const overlayStyle = this.props.overlayStyle ? this.props.overlayStyle : {};
        const contentStyle = this.props.contentStyle ? this.props.contentStyle : {};
        const dialogStyle = this.props.dialogStyle ? this.props.dialogStyle : {};

        const dialog = (
            <div style={modalStyle}>
                <div className="modal-overlay-div" style={overlayStyle} />
                <div className="modal-content-div" style={contentStyle} onClick={this.onOverlayClick.bind(this)}>
                <div className="modal-dialog-div" style={dialogStyle} onClick={this.onDialogClick}>
                    <svg style={{float: 'right'}} onClick={this.props.onClose}xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 36 36"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path></svg>
                    {this.props.children}
                </div>
                </div>
            </div>
        );

        return (
            <div>
                {dialog}

            </div>
            
        );
  }
}