//
//  ButtonExtension.swift
//  AddSnap
//
//  Created by Taras on 7/7/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit

extension UIButton {
    
    func setupBorder() {
        self.layer.borderWidth = 3
        self.layer.borderColor = UIColor.white.cgColor
    }
    
    func setupRedBorder() {
        self.layer.borderWidth = 3
        self.layer.borderColor = UIColor(red: 255/255, green: 22/255, blue: 84/255, alpha: 1.0).cgColor
    }
}
