export const styles = {
  tab: {
    position: 'relative',
  },
  header: {
    position: 'absolute',
    width: '100%',
    maxWidth: '1920px',
    top: '50px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    paddingBottom: {sm: '0', xs: '14px'},
    borderBottom: {sm: 'none', xs: '1px  solid #EAECF0'},
  },
  headerImage: {
    marginLeft: '40px',
  },
  container: {
    display: 'flex',
    margin: '0 auto',
    width: '100%',
    maxWidth: '1920px',
  },
  wrapper: {
    flex: '1',
    margin: {
      xl: '155px 305px 0 196px',
      lg: '155px 13% 0 10%',
      sm: '180px 9% 0 6%',
      xs: '125px 20px 0',
    },
    width: '50%',
    maxWidth: {
      xl: 'calc(50% - 305px - 196px)',
      lg: 'calc(50% - 13% - 10%)',
      sm: 'calc(50% - 9% - 6%)',
    },
  },
  title: {
    marginBottom: '16px',
  },
  titleText: {
    marginBottom: '48px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '54px',
    width: '100%',
    maxWidth: {sm: '436px', xs: '100%'},
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
    gap: '5px',
  },
  link: {
    color: '#FE645E',
    fontWeight: '300',
    textDecoration: 'none',
  },
  imageWrapper: {
    width: '50%',
    maxWidth: '960px',
    height: '100vh',
    position: 'relative',
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: {lg: 'center', sm: 'flex-start'},
    flexDirection: {md: 'row', sm: 'column', xs: 'row'},
  },
  checkbox: {
    '& .MuiSvgIcon-root': {
      fontSize: '16px',
    },
  },
  fpLinksContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '24px',
    gap: '15px',
  },
};
