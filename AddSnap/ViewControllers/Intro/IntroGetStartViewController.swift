//
//  IntroGetStartViewController.swift
//  AddSnap
//
//  Created by Taras on 7/7/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit

class IntroGetStartViewController: UIViewController {

    @IBOutlet weak var startButton: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        startButton.setupBorder()
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}
