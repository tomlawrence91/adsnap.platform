//
//  IntroAllowCameraViewController.swift
//  AddSnap
//
//  Created by Taras on 7/7/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit
import AVFoundation
class IntroAllowCameraViewController: UIViewController {

    @IBOutlet weak var cameraButton: UIButton!
    @IBAction func cameraAction(_ sender: Any) {
        if AVCaptureDevice.authorizationStatus(for: .video) ==  .authorized {
            DispatchQueue.main.async {
                self.loadNext()
            }
        } else {
            AVCaptureDevice.requestAccess(for: .video, completionHandler: { (granted: Bool) in
                if granted {
                    DispatchQueue.main.async {
                        self.loadNext()
                    }
                } else {
                    DispatchQueue.main.async {
                        self.loadNext()
                    }
                }
            })
        }
    }
    
    func loadNext() {
        let storyboard = UIStoryboard(name: "Intro", bundle: nil)
        let controller = storyboard.instantiateViewController(withIdentifier: "IntroAllowLocationViewController")
        self.present(controller, animated: true)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        cameraButton.setupBorder()
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
