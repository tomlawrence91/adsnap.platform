//
//  SuccessScanView.swift
//  AdSnap
//
//  Created by Taras on 7/19/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit

class SuccessScanView: NibLoadingView {
    @IBOutlet weak var redeemButton: UIButton!
    
    @IBAction func otherAction(_ sender: Any) {
        if let tap = action {
            tap()
        }
    }
    @IBAction func redeemAction(_ sender: Any) {
        if let tap = action {
            tap()
        }
    }
    @IBOutlet weak var circleView: UIView!
   
    @IBOutlet weak var labelDiscount: UILabel!
    var action:(()->())? = nil

    @IBOutlet weak var taxDiscountLabel: UILabel!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        redeemButton.layer.borderWidth = 3
        redeemButton.layer.borderColor = UIColor(red: 99/255, green: 0/255, blue: 107/255, alpha: 1.0).cgColor
        circleView.layer.cornerRadius = 60
        circleView.layer.shadowColor = UIColor.black.cgColor
        circleView.layer.shadowRadius = 3.0
        circleView.layer.shadowOpacity = 1.0
        circleView.layer.shadowOffset = CGSize(width: 0, height: 0)
        circleView.layer.masksToBounds = false
    
        labelDiscount.layer.borderWidth = 3
        labelDiscount.layer.borderColor = UIColor.white.cgColor
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
}
