/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};


export type UserType={
  uid:string,
  name:string,
  email:string,
  image:string
} 

export type AuthContextType={
  user:UserType | null;
  setUser:Function;
  login:(email:string,password:string)=>Promise<{success:boolean;msg?:string}>
  register:(email:string,password:string,name:string)=>Promise<{success:boolean;msg?:string}>
  updateUserData:(uid:string)=>Promise<void>
}