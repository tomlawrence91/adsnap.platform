//
//  AdsTableViewCell.swift
//  AddSnap
//
//  Created by Taras on 7/16/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit

class AdsTableViewCell: UITableViewCell {

    @IBAction func startAction(_ sender: Any) {
        if let tap = action {
            tap()
        }
    }
    @IBOutlet weak var startButton: UIButton!
    @IBOutlet weak var logoImage: UIImageView!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var titleLabel: UILabel!
   
    var action:(()->())? = nil
    
    override func awakeFromNib() {
        super.awakeFromNib()
        logoImage.layer.cornerRadius = 40
        logoImage.layer.masksToBounds = true
    }

    func setup(ads:DiscountModel) {
        logoImage.image = UIImage(named: ads.logo)
        titleLabel.text = ads.name
        descriptionLabel.text = ads.description
    }
    
}
