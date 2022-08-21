import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  navbar: {
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    }
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh'
  },
  footer: {
    marginTop: 10,
    textAlign: 'center'
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  media: {
    height: '20rem'
  }
})

export default useStyles;
