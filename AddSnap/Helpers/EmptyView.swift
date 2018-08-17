//
//  EmptyView.swift
//  AddSnap
//
//  Created by Taras on 7/16/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit
import Foundation
import UIKit

class NibLoadingView: UIView {
    
    @IBOutlet weak var view: UIView!
    
    /// Init
    ///
    /// - Parameter frame: frame descript
    override init(frame: CGRect) {
        super.init(frame: frame)
        nibSetup()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        nibSetup()
    }
    
    /// Setup XIB
    fileprivate func nibSetup() {
        backgroundColor = UIColor.clear
        
        view = loadViewFromNib()
        view.frame = bounds
        view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.translatesAutoresizingMaskIntoConstraints = true
        
        addSubview(view)
    }
    
    /// Load XIB
    ///
    /// - Returns: XIBView
    fileprivate func loadViewFromNib() -> UIView {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: String(describing: type(of: self)), bundle: bundle)
        let nibView = nib.instantiate(withOwner: self, options: nil).first as! UIView
        
        return nibView
    }
    
}

class EmptyView: NibLoadingView {

    @IBOutlet weak var buttonSnap: UIButton!
    @IBAction func action(_ sender: Any) {
        if let tap = action {
            tap()
        }
    }
    var action:(()->())? = nil
    override init(frame: CGRect) {
        super.init(frame: frame)
        buttonSnap.setupRedBorder()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

}
