//
//  DiscountModel.swift
//  AddSnap
//
//  Created by Taras on 7/16/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit

struct DiscountModel {
    var name:String
    var description:String
    var logo:String
    var promo = ""
    var id = ""
    var disclaimer = ""
    var amount = ""
}


var promoModel = [DiscountModel(name: "Adidas Challenge", description: "Get a 20% discount on sneakers.", logo: "adidas", promo: "Kd57GF", id: "1", disclaimer: "Only available in attending partner shops", amount:"20%"),
                  DiscountModel(name: "KFC Challenge", description: "The cernal offers you a discount on some chicken.", logo: "KFC", promo: "CHICKEN", id: "2", disclaimer: "Only available in attending partner shops", amount:"15%"),
                  DiscountModel(name: "Heineken Challenge", description: "Get a free heineken at Tomorrowland festival.", logo: "heineken", promo: "Td34dJ", id: "0", disclaimer: "Only available in attending partner shops", amount:"FREE")]



struct DataModel {
    var match = false
    var terms = ""
    var labelOfBrand = ""
    var matched = ""
    var labels = ""
    var text = ""
    var logo = ""
    var longtitude = ""
    var latitude = ""
    var timestamt = ""
    var promo = ""
    var id = ""
    var disclaimer = ""
    var amount = ""
}


