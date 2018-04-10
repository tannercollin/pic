/* react */
import React from 'react';
import Dropzone from 'react-dropzone';

/* other */
import FileSaver from 'filesaver.js';

/* components */
import ToolButton from './toolbutton';
import Canvas from './canvas';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      file: {}
    };
  }

  onDrop(files) {
    this.setState({
      file: files[0]
    });
  }

  onClear() {
    this.setState({
      file: {}
    });
  }

  onSave() {
    if (this.refs.canvas) {
      this.refs.canvas.toBlob(blob => {
        let filename = this.state.file.name.replace(/\.[^/.]+$/, ".png");
        FileSaver.saveAs(blob, filename);
      });
    }
  }

  render() {
    let style = {
      app: {
        display: 'flex',
        width: '100%',
        height: '100%'
      },
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#1E2224'
      },
      upload: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        width: '400px',
        height: '400px',
        borderStyle: 'dashed',
        borderRadius: '10px',
        borderColor: 'gray',
        fontFamily: 'Roboto',
        fontSize: '2em',
        fontWeight: '300',
        color: 'gray'
      },
      toolbar: {
        background: '#1E2224',
        width: '55px',
        height: '100%'
      },
      hr: {
        margin: '0 10%',
        borderColor: '#32323E'
      }
    };

    let content = this.state.file.preview ? (
      <Canvas
        ref='canvas'
        imageUrl={this.state.file.preview} />
    ) : (
      <Dropzone onDrop={this.onDrop} style={style.upload}>
        <div><p>Drag & drop picture</p><p>or press here</p></div>
      </Dropzone>
    );

    return (
      <div style={style.app}>
        <div style={style.toolbar}>
          <ToolButton
            fontAwesome='picture-o'
            onClick={this.onClear} />
          <hr style={style.hr} />
          <ToolButton
            fontAwesome='save'
            onClick={this.onSave} />
        </div>
        <div
          ref='container'
          style={style.container}>
          {content}
        </div>
      </div>
    );
  }

}
