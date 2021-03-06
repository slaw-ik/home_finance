# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150502164549) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "balance_states", force: true do |t|
    t.integer  "user_id"
    t.float    "debet",      default: 0.0
    t.float    "credit",     default: 0.0
    t.date     "on_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", force: true do |t|
    t.integer  "user_id"
    t.integer  "transaction_type_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "courses", force: true do |t|
    t.integer  "currency_id"
    t.float    "value"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "currencies", force: true do |t|
    t.string   "code"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "interval_types", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "settings", force: true do |t|
    t.integer  "user_id"
    t.integer  "default_currency_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sum_types", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sums", force: true do |t|
    t.integer  "parent_id"
    t.integer  "user_id"
    t.integer  "interval_type_id"
    t.integer  "sum_type_id"
    t.date     "date_from"
    t.date     "date_to"
    t.string   "uid"
    t.float    "value",            default: 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transaction_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transactions", force: true do |t|
    t.integer  "user_id"
    t.integer  "transaction_type_id"
    t.integer  "currency_id"
    t.integer  "category_id"
    t.string   "title"
    t.float    "amount"
    t.date     "date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
