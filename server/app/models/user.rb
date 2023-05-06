class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #
  #
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :trackable , :validatable

  has_many :sales
  belongs_to :role

  validates :name, uniqueness: true
  validates :name, presence: true

  def generate_jwt
    JWT.encode({id: id, exp: 60.days.from_now.to_i}, Rails.application.secrets.secret_key_base)
  end

  def to_s
    name
  end

end
