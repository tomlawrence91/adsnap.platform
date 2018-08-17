//
//  DiscountsViewController.swift
//  AddSnap
//
//  Created by Taras on 7/6/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit
import GoogleMaps

class DiscountsViewController: UIViewController, GMSMapViewDelegate, CLLocationManagerDelegate {

    @IBOutlet weak var listButton: UIBarButtonItem!
    @IBAction func listAction(_ sender: Any) {
        if mapEnabled {
            UIView.animate(withDuration: 0.3, animations: {
                self.listTableView.alpha = 1
                self.mapView.alpha = 0
                self.mapEnabled = false
                self.listButton.title = "Map"
            })
        } else {
            UIView.animate(withDuration: 0.3, animations: {
                self.listTableView.alpha = 0
                self.mapView.alpha = 1
                self.mapEnabled = true
                self.listButton.title = "List"
            })
        }
    }
    @IBOutlet weak var listTableView: UITableView!
    @IBOutlet weak var mapView: GMSMapView!
    var locationManager = CLLocationManager()
    var lastLocation:CLLocation?
    var mapEnabled = false
    var destinationMarker: GMSMarker?

    override func viewDidLoad() {
        super.viewDidLoad()
        self.mapView.delegate = self
        self.listTableView.delegate = self
        self.listTableView.dataSource = self
        self.listTableView.rowHeight = 110
        self.listTableView.reloadData()
        addTestMarkers()
    }

    override func viewWillAppear(_ animated: Bool) {
        initializeTheLocationManager()
        toMyLocation()
    }
    
    func addTestMarkers() {
        mapView.clear()
        let newMarker = GMSMarker()
        newMarker.position =  CLLocationCoordinate2D(latitude: 52.5250294, longitude: 13.3236189)
        newMarker.title = "Adidas Originals"
        newMarker.map = self.mapView
        newMarker.appearAnimation = .pop
        let newMarker1 = GMSMarker()
        newMarker1.position =  CLLocationCoordinate2D(latitude: 52.5250294, longitude: 13.3236189)
        newMarker1.title = "Adidas Store"
        newMarker1.map = self.mapView
        newMarker1.appearAnimation = .pop
        let newMarker2 = GMSMarker()
        newMarker2.position =  CLLocationCoordinate2D(latitude: 52.525197, longitude: 13.3236189)
        newMarker2.title = "KFC"
        newMarker2.map = self.mapView
        newMarker2.appearAnimation = .pop
        let newMarker3 = GMSMarker()
        newMarker3.position =  CLLocationCoordinate2D(latitude: 52.5017191, longitude: 13.4243364)
        newMarker3.title = "Heineken"
        newMarker3.map = self.mapView
        newMarker3.appearAnimation = .pop
    }
}

//MARK: - TableView Delegate

extension DiscountsViewController: UITableViewDelegate, UITableViewDataSource {
   
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return promoModel.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
         let cell = tableView.dequeueReusableCell(withIdentifier: "AdsCell", for: indexPath) as! AdsTableViewCell
        cell.setup(ads:promoModel[indexPath.row])
        cell.action = {
             _ = self.tabBarController?.selectedIndex = 1
        }
        return cell
    }
    

}

//MARK: - MAP Delegate
extension DiscountsViewController {
   
    func toMyLocation() {
        guard let _ = lastLocation else {
            return
        }
        let center = CLLocationCoordinate2D(latitude: (lastLocation?.coordinate.latitude)!, longitude: (lastLocation?.coordinate.longitude)!)
        self.mapView.animate(toLocation: center)
        self.mapView.animate(toZoom: 14)
    }
    
    func initializeTheLocationManager() {
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location = locationManager.location?.coordinate
        lastLocation = locationManager.location
        cameraMoveToLocation(toLocation: location)
    }
    
    func cameraMoveToLocation(toLocation: CLLocationCoordinate2D?) {
        if toLocation != nil {
            if destinationMarker == nil {
                destinationMarker = GMSMarker()
                destinationMarker!.position = toLocation!
                destinationMarker!.title = "My location"
                destinationMarker!.map = self.mapView
                destinationMarker!.appearAnimation = .pop
                destinationMarker!.groundAnchor = CGPoint(x: 0.5, y: 0.5)
                mapView.camera = GMSCameraPosition.camera(withTarget: toLocation!, zoom: 14)
            } else {
                CATransaction.begin()
                CATransaction.setAnimationDuration(1.0)
                destinationMarker!.position = toLocation!
                CATransaction.commit()
            }
        }
    }
}
