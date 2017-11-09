import { fromJS } from "immutable";
import {map} from 'lodash';
// import AjaxService from "../../services/AjaxService";
import VisionService from "../../services/VisionService";
import { saveToSpreadsheet } from '../../services/SpreadsheetService'
import * as DealsState from "../deals/DealsState";
// import { Alert } from "react-native";

const SET_UPLOADING_FLAG = "SNAP/SET_UPLOADING_FLAG";

const SET_CURRENT_CHALLENGE = "SNAP/SET_CURRENT_CHALLENGE";

const SHOW_RESULTS = "SNAP/SHOW_RESULTS";
const HIDE_RESULTS = "SNAP/HIDE_RESULTS";

const SET_REWARD = "SNAP/SET_REWARD";

const UPDATE_POINTS = "SNAP/UPDATE_POINTS";

// Initial state
const initialState = fromJS({
  uploading: false,
  currentChallenge: {},
  results: {
    ready: false,
    match: false,
    type: '',
    reward: {},
    labels: [],
    texts: [],
    logos: [],
    brand: ''
  },
  points: 100,
  brandTerms: {
    '3 MOBILE': ['3 Mobile', 'Three Mobile', '3 mobile', 'three mobile', 'Three mobile', 'Three Mobile'],
    'ABERCROMBIE & FITCH': ['Abercrombie & Fitch', 'Abercrombie Fitch', 'Abercrombie and Fitch', 'abercrombie and fitch', 'abercrombie fitch', 'abercrombie & fitch'],
    'ABSOLUT': ['absolut', 'Absolut', 'Absolut Vodka', 'absolut vodka'],
    'ACCESSORIZE': ['Accessorize', 'accessorize'],
    'ADOBE': ['Adobe', 'adobe'],
    'AESOP': ['Aesop', 'aesop'],
    'ALDI': ['Aldi', 'ALDI', 'aldi'],
    'ALDO': ['Aldo', 'aldo'],
    'ALL SAINTS': ['All Saints', 'all saints'],
    'ALL STAR LANES': ['All Star Lanes', 'all star lanes'],
    'AMAZON': ['Amazon', 'amazon'],
    'ANIMAL': ['Animal', 'animal', 'Animal Clothing', 'ANIMAL'],
    'ANN SUMMERS': ['Ann Summers', 'ann summers'],
    'ANTRHOPOLOGIE': ['Anthropologie', 'anthropologie'],
    'APOSTROPHE': ['Apostrophe', 'apostrophe'],
    'APPLE': ['Apple', 'apple', 'Apple Mac', 'iPhone'],
    'ARGOS': ['Argos', 'argos'],
    'ARMANI EXCHANGE': ['Armani Exchange', 'armani exchange', 'Armani', 'armani'],
    'ASDA': ['Asda', 'asda'],
    'ASICS': ['Asics', 'ASICS', 'asics'],
    'ASK ITALIAN': ['Ask Italian', 'ask italian'],
    'ASOS': ['Asos', 'asos', 'ASOS'],
    'ASPINAL OF LONDON': ['Aspinal of London', 'Aspinals of London', 'aspinals of london', 'Aspinal of London'],
    'AUDI': ['Audi', 'audi', 'AUDI'],
    'AUSTIN REED': ['austin reed'],
    'AVIS': ['Avis', 'AVIS', 'avis'],
    'BACARDI': ['Bacardi', 'BACARDI', 'bacardi'],
    'BAILEYS': ['Baileys', 'Baileys Irish Cream', 'baileys'],
    'BARCLAYS': ['Barclays', 'barclays', 'Barclays Bank', 'barclays bank'],
    'BEAVERBROOKS': ['Beaverbrooks', 'beaverbrooks'],
    'BEEFEATER': ['Beefeater', 'BEEFEATER', 'beefeater'],
    'BELLA ITALIA': ['Bella Italia', 'bella italia'],
    'BELSTAFF': ['Belstaff', 'belstaff'],
    'BENCH': ['Bench', 'bench', 'bench.'],
    'UNITED COLORS OF BENETTON': ['United Colors of Benetton', 'Benetton', 'united colors of benetton', 'benetton'],
    'BEN SHERMAN': ['Ben Sherman', 'ben sherman'],
    'BERSHKA': ['Bershka', 'BERSHKA', 'bershka'],
    'BHS': ['BHS', 'bhs'],
    'BILLS': ['Bills', 'Bills Restaurants', 'bills restaurants', 'bills'],
    'BLACKS': ['Blacks', 'blacks', 'Blacks Outdoors'],
    'BLACKWELLS': ['Blackwells', 'blackwells'],
    'BMW': ['BMW', 'bmw'],
    'BOBBI BROWN': ['Bobbi Brown', 'bobbi brown'],
    'BOOHOO': ['Boohoo', 'BooHoo', 'BOOHOO', 'boohoo.com', 'boohoo', 'B0ono.com'],
    'BOOTS': ['Boots', 'BOOTS', 'boots'],
    'BORDERS': ['Borders', 'borders'],
    'BOSE': ['BOSE', 'Bose', 'bose'],
    'HUGO BOSS': ['Hugo Boss', 'hugo boss', 'BOSS', 'boss', 'Boss'],
    'B & Q': ['B&Q', 'b&q'],
    'BREITLING': ['Breitling', 'breitling'],
    'BRITISH AIRWAYS': ['British Airways', 'british airways'],
    'BRITISH TELECOM': ['British Telecom', 'british telecom', 'BT', 'bt'],
    'BUDGENS': ['budgens', 'Budgens', 'BUDGENS'],
    'BULMERS': ['Bulmers Cider', 'Bulmers', 'bulmers cider', 'bulmers'],
    'BURBERRY': ['Burberry', 'burberry'],
    'BURGER KING': ['Burger King', 'burger king', 'BurgerKing', 'burgerking'],
    'BURTON': ['Burton', 'BURTON', 'burton'],
    'BYRON': ['Byron', 'Byron Hamburgers', 'byron', 'byron hamburgers'],
    'CAFFE NERO': ['Cafe Nero', 'Caffe Nero', 'cafe nero', 'caffe nero'],
    'CALVIN KLEIN': ['Calvin Klein', 'calvin klein'],
    'CAMPER': ['Camper', 'camper'],
    'CARPHONE WAREHOUSE': ['Carphone Warehouse', 'CARPHONE WAREHOUSE', 'carphone warehouse'],
    'CASS ART': ['CassArt', 'cassart', 'CASSART', 'cassart'],
    'CATH KIDSTON': ['Cath Kidston', 'cath kidston'],
    'CHARLES TYRWHITT': ['Charles Tyrwhitt', 'charles tyrwhitt'],
    'CHARLOTTE TILBURY': ['Chartlotte Tilbury', 'charlotte tilbury'],
    'CHIVAS REGAL': ['Chivas Regal', 'chivas regal'],
    'CINEWORLD': ['Cineworld', 'cineworld', 'Cine World', 'cine world'],
    'CIROC': ['Ciroc', 'ciroc'],
    'CITROEN': ['Citroen', 'citroen'],
    'CLAIRES': ['Claires', 'claires', 'Claires Accessories', 'claires accessories'],
    'CLARKS': ['Clarks', 'clarks', 'Clarks Shoes', 'clarks shoes'],
    'CLINTONS': ['Clintons', 'clintons', 'Clintons Cards', 'clintons cards'],
    'COACH': ['Coach', 'coach'],
    'COAST': ['Coast', 'coast'],
    'COMET': ['Comet', 'comet'],
    'COMPTOIR LIBANAIS': ['Comptoir Libanais', 'comptoir libanais'],
    'CORAL': ['Coral', 'coral'],
    'COS': ['Cos', 'COS', 'cos'],
    'COSTA COFFEE': ['Costa Coffee', 'costa coffee', 'CostaCoffee'],
    'COST CUTTER': ['Cost Cutter', 'cost cutter', 'CostCutter', 'costcutter'],
    'CROCS': ['Crocs', 'crocs'],
    'DEBENHAMS': ['Debenhams', 'debenhams', 'Debenhams Department Store'],
    'DESIGUAL': ['Desigual', 'desigual', 'Deaigual'],
    'DFS': ['DFS', 'dfs'],
    'DIESEL': ['Diesel', 'diesel'],
    'DISNEY STORE': ['DisneyStore', 'disneystore', 'Disney Store', 'disney store'],
    'DIXONS': ['Dixons', 'dixons'],
    'DKNY': ['DKNY', 'dkny'],
    'DOMINOES PIZZA': ['Dominoes Pizza', 'dominoes pizza', 'DominoesPizza', 'dominoespizza'],
    'DR MARTENS': ['DR Martens', 'Doc Martens', 'dr martens', 'doc martens'],
    'DUNE LONDON': ['Dune', 'Dune London', 'dune', 'dune london', 'Dume'],
    'DYSON': ['Dyson', 'dyson'],
    'EARLY LEARDNING CENTRE': ['Early Learning Centre', 'Early Learning Center', 'early learning centre', 'early learning center'],
    'EASYJET': ['easyJet', 'europe by easyJet', 'business by easyJet', 'This is The Generation easyJet', 'Come On Lets Fly'],
    'EBAY': ['Ebay', 'ebay', 'eBay'],
    'ECCO': ['Ecco', 'ecco', 'ECCO'],
    'ERNEST JONES': ['ERNEST JONES', 'Ernest Jones'],
    'EUROCHANGE': ['eurochange'],
    'EUROPCAR': ['europcar', 'Europcar'],
    'FAT FACE': ['Fat Face', 'FATFACE'],
    'FENWICK': ['Fenwick'],
    'FERRARI': ['Ferrari', 'Ferrari.com'],
    'FIRETRAP': ['Firetrap'],
    'FIVE GUYS': ['Five Guys', 'FIVE GUYS'],
    'FOOT LOCKER': ['Foot Locker'],
    'FOSSIL': ['Fossil', 'FOSSIL'],
    'FOSTERS': ['FOSTERS', 'Fosters'],
    'FOYLES': ['FOYLES'],
    'FRED PERRY': ['Fred Perry', 'FRED PERRY'],
    'FRENCH CONNECTION': ['FRENCH CONNECTION'],
    'GAILS': ['GAILS', 'GAILS ARTISAN BAKERY'],
    'GAME': ['GAME'],
    'GANT': ['GANT'],
    'GAP': ['GAP'],
    'GAYMERSCIDER': ['GAYMERS'],
    'GBK': ['GBK', 'GOURMET BURGER KITCHEN'],
    'GEOX': ['GEOX'],
    'GIRAFFE': ['giraffe'],
    'GLENFIDDICH': ['Glenfiddich', 'Glenfiddich SINGLE MALT SCOTCH WHISKEY'],
    'GORDONS': ['Gordons'],
    'GSTARRAW': ['G-STAR RAW', 'G STAR RAW'],
    'GUCCI': ['GUCCI'],
    'GUESS': ['GUESS'],
    'GUINNESS': ['Guinness', 'GUINNESS'],
    'GYM BOX': ['Gymbox', 'Gym Box', 'GYMBOX', 'GYM BOX', 'gym box', 'gymbox'],
    'HABITAT': ['Habitat', 'habitat'],
    'HACKETT': ['Hackett'],
    'HALFORDS': ['Halfords', 'HALFORDS', 'halfords'],
    'HAMLEYS': ['Hamleys', 'hamleys', 'HAMLEYS'],
    'HARRODS': ['Harrods', 'harrods', 'HARRODS'],
    'HAVAIANAS': ['Havaianas', 'havaianas'],
    'HAWES & CURTIS': ['Hawes & Curtis', 'Hawes and Curtis', 'hawes & curtis', 'Hawes & Curtis'],
    'H&M': ['H&M', 'H & M', 'h&m', 'h & m'],
    'HMV': ['HMV', 'hmv'],
    'HOBBS': ['Hobbs', 'hobbs'],
    'HOB SALONS': ['Hob Salons', 'HOB SALONS', 'hob salons', 'Hob', 'hob'],
    'HOLLAND & BARRETT': ['Holland & Barrett', 'HOLLAND & BARRETT', 'HOLLAND AND BARRETT', 'Holland and Barrett', 'holland and barrett', 'holland & barrett'],
    'HOLLISTER': ['Hollister', 'hollister'],
    'HOMEBASE': ['Homebase', 'HOMEBASE', 'homebase', 'Home base', 'HOME BASE', 'home base'],
    'HOTEL CHOCOLAT': ['Hotel Chocolat', 'hotel chocolat'],
    'HOUSE OF FRASER': ['House of Fraser', 'HOUSE OF FRASER', 'house of fraser'],
    'HP': ['HP', 'Hewlett Packard', 'hp', 'hewlett packard'],
    'H SAMUEL': ['H Samuel', 'HSamuel', 'h samuel', 'hsamuel'],
    'HSBC': ['HSBC', 'hsbc', 'Hong Kong and Shanghai Bank'],
    'HUMMINGBIRD BAKERY': ['Hummingbird Bakery', 'hummingbird bakery', 'Hummingbird', 'hummingbird'],
    'ICELAND': ['Iceland', 'ICELAND', 'iceland'],
    'IKEA': ['IKEA', 'ikea', 'Ikea'],
    'ITSU': ['ITSU', 'itsu', 'Itsu'],
    'JACK DANIELS': ['Jack Daniels', 'jack daniels'],
    'JACK WILLS': ['Jack Wills', 'jack wills'],
    'JAGERMEISTER': ['Jagermeister', 'jagermeister'],
    'JAGUAR LAND ROVER': ['Jaguar Land Rover', 'jaguar land rover', 'Jaguar Landrover', 'jaguar landrover'],
    'JAMESON': ['Jameson', 'jameson'],
    'JAMIES ITALIAN': ['Jamies Italian', 'jamies italian'],
    'JD SPORTS': ['JD Sports', 'JD Sport', 'jd sports', 'jd sport'],
    'JEEP': ['Jeep', 'JEEP', 'jeep'],
    'JESSOPS': ['Jessops', 'jessops'],
    'JIGSAW': ['Jigsaw', 'jigsaw'],
    'JIM BEAM': ['Jim Beam', 'JIM BEAM', 'jim beam', 'JimBeam', 'JIMBEAM', 'jimbeam'],
    'JOHN LEWIS': ['John Lewis', 'JohnLewis', 'john lewis', 'johnlewis'],
    'JOHNNIE WALKER': ['Johnnie Walker', 'johnnie walker', 'JOHNNIE WALKER'],
    'JOHNSONS': ['Johnsons', 'johnsons'],
    'JO MALONE': ['Jo Malone', 'JoMalone', 'jomalone', 'jo malone'],
    'KAREN MILLEN': ['Karen Millen', 'karen millen'],
    'KIEHLS': ['Kiehls', 'KIEHLS', 'kiehls'],
    'KRISPY KREME': ['Krispy Kreme', 'krispy kreme', 'KRISPY KREME'],
    'KURT GEIGER': ['Kurt Geiger', 'kurt geiger', 'KURT GEIGER'],
    'LACOSTE': ['Lacoste', 'LACOSTE', 'lacoste'],
    'LAKELAND': ['Lakeland', 'LAKELAND', 'lakeland'],
    'LAMBOURGHINI': ['Lambourghini', 'lambourghini', 'LAMBOURGHINI'],
    'LA SENZA': ['La Senza', 'la senza'],
    'LAURA ASHLEY': ['Laura Ashley', 'laura ashley', 'LAURA ASHLEY'],
    'LEGO': ['Lego', 'LEGO', 'lego'],
    'LE PAIN QUOTIDIEN': ['Le Pain Quotidien', 'le pain quotidien', 'LE PAIN QUOTIDIEN'],
    'LEVIS': ['Levis', 'levis'],
    'LG': ['LG', 'lg'],
    'LIBERTIES': ['Liberties', 'LIBERTIES', 'Liberties of London', 'LIBERTIES OF LONDON'],
    'LINKS OF LONDON': ['Links of London', 'links of london'],
    'L K BENNETT': ['L K Bennett', 'L K BENNETT', 'l k bennett'],
    'LLOYDS BANK': ['Lloyds Bank', 'lloyds bank', 'LLOYDS BANK'],
    'L OCCITANE': ['Loccitane', 'loccitane', 'LOCCITANE', 'LOccitane'],
    'LONDON PRIDE': ['London Pride', 'Fullers', 'london pride', 'fullers'],
    'LONGCHAMP': ['Longchamp', 'longchamp'],
    'LOUIS VUITTON': ['Louis Vuitton', 'louis vuitton'],
    'LUCOZADE': ['Lucozade', 'lucozade', 'LUCOZADE'],
    'LUSH': ['LUSH', 'Lush', 'lush'],
    'MAC MAKEUP': ['M.A.C', 'M.A.C Makeup', 'm.a.c makeup', 'MAC Makeup', 'mac makeup'],
    'MAGNERS': ['Magners', 'magners'],
    'MALIBU': ['Malibu', 'MALIBU', 'malibu'],
    'MAMAS & PAPAS': ['Mamas & Papas', 'MAMAS & PAPAS', 'Mamas&Papas', 'MAMAS&PAPAS', 'mamas&papas', 'mamas & papas'],
    'M & S': ['M & S', 'm & s', 'M&S', 'm&s', 'Marks and Spencer', 'marks and spencer', 'Marks and Spencers', 'marks and spencers', 'Marks & Spencer', 'marks & spencer', 'Marks & Spencers', 'marks & spencers']
  }
});

export function uploadSnap(file) {

  return async (dispatch, getState) => {

    dispatch(setUploadingFlag(true));

    VisionService.annotate(file, (res) => {
      dispatch(showResults(res.responses, file));
      dispatch(setUploadingFlag(false));
    })

  };
}

export function setUploadingFlag(uploadingFlag) {
  return {
    type: SET_UPLOADING_FLAG,
    payload: uploadingFlag
  };
}

export function showResults(results, file) {
  return {
    type: SHOW_RESULTS,
    payload: {
      results: results,
      file: file
    }
  };
}
export function hideResults() {
  return {
    type: HIDE_RESULTS,
    payload: {}
  };
}

export function setCurrentChallenge(challenge) {
  return {
    type: SET_CURRENT_CHALLENGE,
    payload: challenge
  }
}

export function setReward(reward) {
  return {
    type: SET_REWARD,
    payload: reward
  }
}

export function updatePoints(amount) {
  return {
    type: UPDATE_POINTS,
    payload: amount
  }
}

// Reducer
export default function SnapStateReducer(state = initialState, action = {}) {

  let results = {};

  switch (action.type) {
    case SET_CURRENT_CHALLENGE:
      return state.set("currentChallenge", fromJS(action.payload));

    case HIDE_RESULTS:
      results = state.get("results").toJS();
      results.ready = false;
      return state.set("results", fromJS(results));

    case SHOW_RESULTS:

      // check if result is positive or negative
      results = state.get("results").toJS();
      results.ready = true;

      // negative
      results.match = false;

      let labelAnnotations = action.payload.results[0].labelAnnotations || [];
      let textAnnotations = action.payload.results[0].textAnnotations || [];
      let logoAnnotations = action.payload.results[0].logoAnnotations || [];
      const annotations = [labelAnnotations, textAnnotations, logoAnnotations];
      let [ labels, texts, logos ] = map(annotations, type => type && map(type, annotation => typeof annotation.description === 'string' && annotation.description.toLowerCase() ));

      texts && texts.forEach(text => {
        const splitText = text.split('\n');
        if (splitText.length > 1) {
          splitText.forEach(fragment => texts.push(fragment));
        }
        texts.push(splitText.join(' ').trim());
      });

      results.file = action.payload.file;
      results.terms = labels.concat(texts, logos);

      // match against keywords of current challenge, or generic terms
      const matchAgainst = state.get('currentChallenge').toJS();

      results.type = 'ad';
      results.termsMatching = ['advertisement', 'advertising', 'mural', 'billboard', 'logo', 'product', 'brand', 'poster', 'signage', 'sign', 'retail', 'fashion model', 'shopping', 'fun'];

      if (matchAgainst.keywords) {
        results.termsMatching = matchAgainst.keywords;
        results.type = 'challenge';
      }

      results.termsMatching.forEach(term => {
        if (results.terms.includes(term.toLowerCase())) {
          results.match = true;
        }
      });


      if (results.type === 'ad' && (results.match || logos.length)) {

        // match against brands
        let matchBrand = false;

        const brandTerms = state.get('brandTerms').toJS();

        for (let brandName in brandTerms) {
          if (!brandTerms.hasOwnProperty(brandName)) {
            return;
          }

          // match each term in terms array against brand terms
          brandTerms[brandName].forEach(brandTerm => {

            if (logos.length) {
              logos.forEach(logo => {
                let regex = new RegExp('^' + brandTerm.toLowerCase() + '$', 'gi');

                if (logo && logo.match(regex)) {
                  matchBrand = true;
                  results.match = true;
                  results.type = 'deal';
                  results.brand = brandName;
                }
              });
            }

            if ( ! matchBrand ) {
              results.terms.forEach(term => {
                let regex = new RegExp('^' + brandTerm.toLowerCase() + '$', 'gi');
                if (term && term.match(regex)) {
                  matchBrand = true;
                  results.match = true;
                  results.type = 'deal';
                  results.brand = brandName;
                }
              });
            }

          })
        }
      }

      saveToSpreadsheet(results.match, results.brand, results.termsMatching, annotations)
      return state.set("results", fromJS(results));

    case SET_REWARD:
      results = state.get("results").toJS();
      results.reward = action.payload;
      results.brand = '';
      return state.set("results", fromJS(results));

    case SET_UPLOADING_FLAG:
      return state.set("uploading", fromJS(action.payload));

    case UPDATE_POINTS:
      return state.set("points", fromJS(action.payload));

    default:
      return state;
  }
}
