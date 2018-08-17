//
//  ViewController.swift
//  AddSnap
//
//  Created by Taras on 7/6/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit

class RootViewController: UIViewController {

    override func viewDidAppear(_ animated: Bool) {
        checkUser()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    func checkUser() {
        let fisrtScreen = UserDefaults.standard.object(forKey: "firstLoad") as? Bool
        if fisrtScreen == false {
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let controller = storyboard.instantiateViewController(withIdentifier: "MainVC")
            self.present(controller, animated: true)
        } else {
            let storyboard = UIStoryboard(name: "Intro", bundle: nil)
            let controller = storyboard.instantiateViewController(withIdentifier: "IntroGetStartViewController")
            self.present(controller, animated: true)
        }
    }
}

