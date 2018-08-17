//
//  IntroAllowLocationViewController.swift
//  AddSnap
//
//  Created by Taras on 7/7/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit
import CoreLocation

class IntroAllowLocationViewController: UIViewController {
    let locationManager = CLLocationManager()

    @IBAction func dismissAction(_ sender: Any) {
        loadMainView()
    }
    @IBOutlet weak var locationButtom: UIButton!
    @IBAction func locationAction(_ sender: Any) {
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters
        locationManager.distanceFilter = 50
        if CLLocationManager.locationServicesEnabled() {
            switch CLLocationManager.authorizationStatus() {
            case .notDetermined, .restricted, .denied:
                locationManager.requestAlwaysAuthorization()
            case .authorizedAlways, .authorizedWhenInUse:
                DispatchQueue.main.async {
                    self.loadMainView()
                }
            }
        } else {
            locationManager.requestAlwaysAuthorization()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationButtom.setupBorder()
        // Do any additional setup after loading the view.
    }

     func loadMainView() {
        UserDefaults.standard.set(false, forKey: "firstLoad")
        UserDefaults.standard.synchronize()
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let controller = storyboard.instantiateViewController(withIdentifier: "MainVC")
        self.present(controller, animated: true)
    }
}

extension IntroAllowLocationViewController: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        switch status {
        case .notDetermined:
            manager.requestAlwaysAuthorization()
            break
        case .authorizedWhenInUse:
            manager.startUpdatingLocation()
            loadMainView()

            break
        case .authorizedAlways:
            manager.startUpdatingLocation()
            loadMainView()

            break
        case .restricted:
            // restricted by e.g. parental controls. User can't enable Location Services
            break
        case .denied:
            loadMainView()
            break
        }
    }
}
