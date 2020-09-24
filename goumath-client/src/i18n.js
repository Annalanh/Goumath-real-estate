import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from 'i18next-browser-languagedetector';
import enPostDetailPageNS from "./translation/en/PostDetailPage.json"
import vnPostDetailPageNS from "./translation/vn/PostDetailPage.json"
import enAuthPageNS from "./translation/en/AuthPage.json"
import vnAuthPageNS from "./translation/vn/AuthPage.json"
import enProfilePageNS from "./translation/en/ProfilePage.json";
import vnProfilePageNS from "./translation/vn/ProfilePage.json";
import enHomepageNS from "./translation/en/HomePage.json"
import vnHomepageNS from "./translation/vn/HomePage.json"
import enCommonNS from "./translation/en/Common.json"
import vnCommonNS from "./translation/vn/Common.json"
import enNewPostPageNS from "./translation/en/NewPostPage.json"
import vnNewPostPageNS from "./translation/vn/NewPostPage.json"
import enUpdatePostPageNS from "./translation/en/UpdatePostPage.json"
import vnUpdatePostPageNS from "./translation/vn/UpdatePostPage.json"
import enAsideBarNS from "./translation/en/AsideBar.json"
import vnAsideBarNS from "./translation/vn/AsideBar.json"
import enNavBarNS from "./translation/en/NavBar.json"
import vnNavBarNS from "./translation/vn/NavBar.json"
import enFormNS from "./translation/en/Form.json"
import vnFormNS from "./translation/vn/Form.json"
import enCalculateLoanNS from "./translation/en/CalculateLoan.json"
import vnCalculateLoanNS from "./translation/vn/CalculateLoan.json"
import enStatisticNS from "./translation/en/Statistic.json"
import vnStatisticNS from "./translation/vn/Statistic.json"
const resources = {
    en: {
      common: enCommonNS,
      profilePage: enProfilePageNS,
      homePage: enHomepageNS,
      newPostPage: enNewPostPageNS,
      updatePostPage: enUpdatePostPageNS,
      postDetailPage: enPostDetailPageNS,
      authPage: enAuthPageNS,
      asideBar: enAsideBarNS,
      navBar: enNavBarNS,
      form: enFormNS,
      calculateLoan: enCalculateLoanNS,
      statistic: enStatisticNS
    },
    vn: {
      common: vnCommonNS,
      profilePage: vnProfilePageNS,
      homePage: vnHomepageNS,
      newPostPage: vnNewPostPageNS,
      updatePostPage: vnUpdatePostPageNS,
      postDetailPage: vnPostDetailPageNS,
      authPage: vnAuthPageNS,
      asideBar: vnAsideBarNS,
      navBar: vnNavBarNS,
      form: vnFormNS,
      calculateLoan: vnCalculateLoanNS,
      statistic: vnStatisticNS
    }
};

const detectorOptions = {
  order: ['localStorage','querystring', 'cookie','sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
}
i18n
  .use(LngDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    defaultLanguage: 'en',
    detection: detectorOptions,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;