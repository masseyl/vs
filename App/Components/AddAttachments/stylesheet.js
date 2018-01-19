import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../assets/styles/global';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 57
  },
  attachmentError: {
    borderWidth: 4,
    borderColor: colors.badgeRed
  },
  addButton: {
    flex: 0.1,
    marginRight: 10
  },
  itemContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  itemBox: {
    marginBottom: 20,
    marginRight: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 29,
    borderRadius: 20,
    borderColor: colors.pillBorder,
    borderWidth: 2,
    backgroundColor: '#FFFFFF'
  },
  itemText: {
    marginHorizontal: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    color: '#000000'
  },
  addAttribute: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyBackground,
    borderRadius: 17,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    marginVertical: 5
  },
  icon: {
    overflow: 'visible',
    alignSelf: 'center',
    marginRight: 32
  },
  label: {
    height: 22,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 22,
    color: colors.primary
  },
  removeItem: {
    flex: 0,
    marginRight: 10
  },
  removeIcon: {
    height: 8,
    width: 8
  },
  verticalDivider: {
    marginHorizontal: 4,
    width: 1,
    height: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.secondary
  },
  attachmentRow: {
    flex: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  attachment: {
    marginHorizontal: 9,
    marginVertical: 4,
    width: 70,
    height: 70
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1
  },
  modalContainer: {
    borderRadius: 5,
    height: 180,
    width: width - 40,
    marginHorizontal: 20,
    marginTop: 80,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCopy: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 20,
    marginTop: 10
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between'
  },
  modalButton: {
    width: '46%',
    height: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  modalButtonWhite: {
    backgroundColor: '#FFFFFF',
    height: 40,
    marginVertical: 10
  },
  modalButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.textWhite
  },
  modalButtonTextBlue: {
    color: colors.primary
  }
});

export default styles;
