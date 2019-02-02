import path from 'path';

export default [ {
  input: path.join(__dirname, 'lib/parsing/index.js'),
  output: {
    file: 'dist/parsing/index.js',
    name: 'md-reactor',
    format: 'umd'
  }
}, {
  external: ['react', 'react-syntax-highlighter'],
  input: path.join(__dirname, 'lib/rendering/index.js'),
  output: {
    file: 'dist/rendering/index.js',
    name: 'md-reactor',
    format: 'umd',
    globals: {
      'react': 'React',
      'react-syntax-highlighter': 'ReactSyntaxHighlighter'
    }
  }
} ];