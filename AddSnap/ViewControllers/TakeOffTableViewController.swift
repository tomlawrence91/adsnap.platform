//
//  TakeOffTableViewController.swift
//  AddSnap
//
//  Created by Taras on 7/6/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit

class TakeOffTableViewController: UITableViewController {
    var model = [String]()
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if model.count == 0 {
            let view = EmptyView(frame: tableView.frame)
            view.action = {
                _ = self.tabBarController?.selectedIndex = 1
            }
            self.tableView.backgroundView = view
        } else {
             self.tableView.backgroundView = nil
        }
        return model.count
    }
}
