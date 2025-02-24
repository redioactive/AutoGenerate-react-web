import React from 'react';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  value:string;
  language?:string;
  height?:number;
  onChange?:(value:string) => void;
}

/**
 * 代码编辑器
 * @constructor
 * @author https://github.com/redioactive
 * */
export const CodeEditor:React.FC<Props> = (props) => {
  const {value,height = 400, language = 'sql', onChange} = props;

  const options = {
    selectOnLineNumbers:true,
    fontSize:14,
    formatOnPaste:true,
    automaticLayout:true,
    minimap:{
      enabled:false
    }
  }
  return (
    <MonacoEditor
    height={height}
    language={language}
    theme="vs-dark"
    value={value}
    options={options}
    onChange={onChange}/>
  )
}