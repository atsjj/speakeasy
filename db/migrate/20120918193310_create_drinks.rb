class CreateDrinks < ActiveRecord::Migration
  def change
    create_table :drinks do |t|
      t.string :title
      t.timestamps
    end
  end
end
